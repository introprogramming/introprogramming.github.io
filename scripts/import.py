import codecs
import os
import zipfile
import urllib2
import shutil
import json
import markdown2

import sys

# Use UTF-8 as default
reload(sys)
sys.setdefaultencoding('utf-8')

REPO_URL = 'https://github.com/introprogramming/exercises/archive/master.zip'
DOWNLOAD_FILENAME = 'repo-download.zip'
EXTRACT_DIR = '../exercises'
FINAL_ZIP_PATH = '../exercises.zip'
EXERCISE_PARENT_PATH = 'exercises-master/exercises'
HTML_README_TEMPLATE = '<!DOCTYPE html><html><head><meta charset="utf-8"><title>README.html</title></head><body>%s</body></html>'


def main():
    print "Downloading from exercise repo..."
    request = urllib2.urlopen(REPO_URL)
    with open(DOWNLOAD_FILENAME, 'wb') as repo_file:
        repo_file.write(request.read())
    print "Done"

    exercise_list = []

    print "Extracting exercises from zip..."

    # Detect exercise directories by looking for READMEs
    with zipfile.ZipFile(DOWNLOAD_FILENAME, 'r') as zf:
        for member in zf.namelist():
            if member.startswith(EXERCISE_PARENT_PATH) and os.path.basename(member) == 'README.md':
                extract_exercise(zf, os.path.dirname(member), exercise_list)

        with zf.open(EXERCISE_PARENT_PATH + '/exercises_order') as source:
            grading_list = source.read().splitlines()

    print "Done"
    print "Sorting exercises according to grading list..."
    sorted_exercise_list = sort_exercise_list(exercise_list, grading_list)

    # Dump list of exercises
    write_create_dir('../exercises.json', json.dumps(sorted_exercise_list))

    print "Done"
    print "Creating exercise archive..."

    create_exercise_archive()

    print "Done"
    print '%d exercises can be found in the directory "%s" and in the archive "%s"' % (
        len(exercise_list), EXTRACT_DIR, FINAL_ZIP_PATH)


def sort_exercise_list(exercise_list, grading_list):
    # Quick and dirty sorting of exercises according to grading 

    sorted_items    = [ m for n in grading_list for m in exercise_list if m['name'] == n ]
    unsorted_items  = [ n for n in exercise_list if n['name'] not in grading_list ]
    items_not_found = [ n for n in grading_list if n not in [ m['name'] for m in exercise_list ] ]

    if unsorted_items:
        print "The following exercises is missing in grading file:\n  " + "\n  ".join([m['name'] for m in unsorted_items])
    if items_not_found:
        print "The following exercises in the grading file is missing in the repo:\n  " + "\n  ".join(items_not_found)

    return sorted_items + unsorted_items


def extract_exercise(zf, zip_dir, exercise_list):
    # Extract the README
    readme_path = zip_dir + '/README.md'
    extract_file_in_zip(zf, readme_path)
    save_html_readme(zf, readme_path)

    extracted_files = []
    extract_included_files(zf, zip_dir, extracted_files)

    ex_name = os.path.split(zip_dir)[1]
    exercise_list.append({'name': ex_name, 'files': extracted_files})


def create_exercise_archive():
    with zipfile.ZipFile(FINAL_ZIP_PATH, 'w') as out_zip:
        abs_dir = os.path.abspath(EXTRACT_DIR)
        abs_dir_length = len(abs_dir)

        # Go through every file in directory
        for root, dirs, files in os.walk(EXTRACT_DIR):
            for file in files:

                # Take substring from absolute to get only 'exercise_name/file.xy'.
                # Needed to make sure that exercises are listed at top level in archive.
                abs_path = os.path.abspath(os.path.join(root, file))
                archive_name = os.path.join(abs_path[abs_dir_length + len(os.pathsep):])

                out_zip.write(os.path.join(root, file), arcname=archive_name)


def extract_included_files(zf, zip_dir, extracted_files):
    # Look for file index
    index_path = zip_dir + '/files.json'
    try:
        with zf.open(index_path) as source:
            files = json.load(source)
    except KeyError:
        # The exercise has no file index, return
        return

    # Extract files in index
    for file_path in files:
        file_zip_path = zip_dir + '/' + file_path
        try:
            extract_file_in_zip(zf, file_zip_path)
            extracted_files.append(file_path)
        except KeyError:
            print 'Warning: Could not find "%s"' % file_zip_path


def extract_file_in_zip(zf, file_path_in_zip):
    source = zf.open(file_path_in_zip)
    out_path = zip_to_extract_path(file_path_in_zip)
    silent_make_dir(os.path.dirname(out_path))
    target = file(out_path, 'wb')
    with source, target:
        shutil.copyfileobj(source, target)


def save_html_readme(zf, file_path_in_zip):
    source = zf.open(file_path_in_zip)
    out_path = os.path.splitext(zip_to_extract_path(file_path_in_zip))[0] + '.html'
    silent_make_dir(os.path.dirname(out_path))
    target = file(out_path, 'wb')
    with source, target:
        md_readme = source.read()

        # Strip BOM from start of file, if there is any
        if md_readme.startswith(codecs.BOM_UTF8):
            md_readme = md_readme[len(codecs.BOM_UTF8):]

        html_readme = markdown2.markdown(md_readme, extras=['fenced-code-blocks', 'cuddled-lists'])
        target.write(HTML_README_TEMPLATE % html_readme)


def zip_to_extract_path(file_path_in_zip):
    return os.path.join(EXTRACT_DIR, file_path_in_zip[len(EXERCISE_PARENT_PATH) + 1:])


def silent_make_dir(dir):
    if not os.path.isdir(dir):
        os.makedirs(dir)


def write_create_dir(path, data):
    dirpath = os.path.dirname(path)
    silent_make_dir(dirpath)
    with open(path, 'wb') as file:
        file.write(data)


if __name__ == '__main__':
    main()
