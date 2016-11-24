// Data points to be searching for in English paragraphs
const datePattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
const femaleGender = ["her", "she"];
const maleGender = ["him", "he"];
const negativeSentiment = ["disappointed", "sad", "angry", "frustrated"];
const positiveSentiment = ["happy", "satisfied", "glad", "jubilant"];

export function sentimentAnalysisAndMore(paragraph) {
    /**
    * Loops through paragraph String and returns the sentiment analysis object
    * @param {String} paragraph
    * @return {Object} sentimentAnalysis
    */

    var datesArr = [];
    var sentimentObj = {
        negative: 0,
        positive: 0
    };
    var paragraphArray = paragraph.replace(/[,. ]+/g, " ").trim().split(" ");
    var genderObj = {
        male: 0,
        female: 0
    }

    for(var i=0; i<=paragraphArray.length; i++) {
        if (datePattern.test(paragraphArray[i])) {
            datesArr.push(new Date(paragraphArray[i]));
        } else if (maleGender.indexOf(paragraphArray[i]) > -1) {
            genderObj.male += 1;
        } else if (femaleGender.indexOf(paragraphArray[i]) > -1) {
            genderObj.female += 1;
        } else if (negativeSentiment.indexOf(paragraphArray[i]) > -1) {
            sentimentObj.negative +=1;
        } else if (positiveSentiment.indexOf(paragraphArray[i]) > -1) {
            sentimentObj.positive +=1;
        }
    }

    return {
        timeDuration: getTimeDuration(datesArr),
        gender: getGender(genderObj),
        sentiment: getSentiment(sentimentObj)
    }
}

export function getSentiment(sentimentObj) {
    /**
    * Takes Object of count by sentiment type and returns the sentiment
    * @param {Object} sentimentObj
    * @return {String} sentiment
    */
    if(sentimentObj.negative > 0 && sentimentObj.positive > 0) {
        return "mixed";
    } else if (sentimentObj.negative > 0) {
        return "negative";
    } else if (sentimentObj.positive > 0) {
        return "positive";
    } else {
        return "unknown";
    }
}

export function getTimeDuration(datesArr) {
    /**
    * Takes array of dates and returns time duration
    * @param {array} datesArr
    * @return {Number} timeDuration
    */
    var maxDate=new Date(Math.max.apply(null, datesArr));
    var minDate=new Date(Math.min.apply(null, datesArr));
    var timeDuration = (maxDate - minDate)/86400000; // divide by 1 day in milliseconds

    return timeDuration;
}

export function getGender(genderObj) {
    /**
    * Takes object with count by and returns gender with max count
    * @param {array} genderObj
    * @return {String} gender
    */

    if (genderObj.male > genderObj.female) {
        return "male";
    } else if (genderObj.female > genderObj.male) {
        return "female";
    }
    return "unknown"
}

// Paragraphs to be searched
const paragraphs = {
    "John": "John downloaded the Pokemon Go app on 07/15/2016. By 07/22/2016, he was on level 24. Initially, he was very happy with the app. However, he soon became very disappointed with the app because it was crashing very often. As soon as he reached level 24, he uninstalled the app.",
    "Hua Min": "Hua Min liked playing tennis. She first started playing on her 8th birthday - 07/07/1996. Playing tennis always made her happy. She won her first tournament on 08/12/2010. However, on 04/15/2015 when she was playing at the Flushing Meadows, she had a serious injury and had to retire from her tennis career."
}

// console logs of Main Function
console.log("John: ", sentimentAnalysisAndMore(paragraphs["John"]));
console.log("Hua Min: ", sentimentAnalysisAndMore(paragraphs["Hua Min"]));
