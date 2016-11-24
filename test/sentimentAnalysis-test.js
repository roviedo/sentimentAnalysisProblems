import { getSentiment, getTimeDuration, getGender, sentimentAnalysisAndMore } from "../sentimentAnalysis";
var assert = require('assert');

describe('Sentiment Analysis and more', function() {
  describe('getGender', () => {
    it('should equal to female since it is greater than male in genderObj', () => {
      const genderObj = {
          male: 2,
          female: 4
      }
      let gender = getGender(genderObj);
      assert.equal(gender, "female");
    });

    it('should equal to 6856 days when passing array below to getTimeDuration', () => {
      const datesArr = [
          new Date("07/07/1996"),
          new Date("08/12/2010"),
          new Date("04/15/2015")
      ]

      let timeDuration = getTimeDuration(datesArr);
      assert.equal(timeDuration, 6856);
    });

    it('should return mixed sentiment when both positive and negative are greater than 0', () => {
      const sentimentObj = {
          positive: 3,
          negative: 2
      }

      let sentiment = getSentiment(sentimentObj);
      assert.equal(sentiment, "mixed");
    });

    it('should return positive sentiment when positive > 0 and negative = 0', () => {
      const sentimentObj = {
          positive: 3,
          negative: 0
      }

      let sentiment = getSentiment(sentimentObj);
      assert.equal(sentiment, "positive");
    });

    it('should equal to sentiment analysis provided for John', () => {
      const paragraph = "John downloaded the Pokemon Go app on 07/15/2016. By 07/22/2016, he was on level 24. Initially, he was very happy with the app. However, he soon became very disappointed with the app because it was crashing very often. As soon as he reached level 24, he uninstalled the app."

      let sentimentAnalysis = sentimentAnalysisAndMore(paragraph) ;
      assert.deepEqual(sentimentAnalysis, { timeDuration: 7, gender: 'male', sentiment: 'mixed' });
    });

    it('should equal to sentiment analysis provided for Hua Min', () => {
      const paragraph = "Hua Min liked playing tennis. She first started playing on her 8th birthday - 07/07/1996. Playing tennis always made her happy. She won her first tournament on 08/12/2010. However, on 04/15/2015 when she was playing at the Flushing Meadows, she had a serious injury and had to retire from her tennis career."

      let sentimentAnalysis = sentimentAnalysisAndMore(paragraph) ;
      assert.deepEqual(sentimentAnalysis, { timeDuration: 6856, gender: 'female', sentiment: 'positive' });
    });
  });
});
