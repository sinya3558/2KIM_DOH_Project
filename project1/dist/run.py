import os
import argparse
import subprocess

parser = argparse.ArgumentParser(description = 'make it as executable file')
parser.add_argument('command')

args = parser.parse_args()
action = args.command

if (action == 'install'):
    subprocess.run(["npm init -y"], shell = True)
    subprocess.run(["npm install commander figlet"], shell = True)
    subprocess.run(["npm install @types/node typescript --save-dev"], shell = True)
