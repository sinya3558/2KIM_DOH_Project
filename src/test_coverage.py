import unittest
from run_test import main

class TestCoverage(unittest.TestCase):
    def test_(self):
        #for action in ['install', 'build', 'test.txt', 'test']:
        #    result = main(action)
        #    self.assertEqual(result, 0)
        result = main('test.txt')
        self.assertEqual(result, 0)

if __name__ == '__main__':
    unittest.main()
