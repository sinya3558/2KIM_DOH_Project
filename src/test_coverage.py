import unittest
from run_test import main

class TestCoverage(unittest.TestCase):
    def test_(self):
        #for action in ['install', 'build', 'test.txt', 'test']:
        #    result = main(action)
        #    self.assertEqual(result, 0)
        result = main('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','Sample_Url_File.txt')
        self.assertEqual(result, 0)

if __name__ == '__main__':
    unittest.main()
