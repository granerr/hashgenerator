function processResults(arr) {
  return arr.filter(obj => obj.value >= 0.95 && obj.value < 1);
}

function lowConfidenceResults(arr) {
  return arr.filter(obj => obj.value >= 0.9 && obj.value < 1);
}

function getHashtags(arr) {
  return arr.map(x => `#${x.name}`);
}

module.exports = { processResults, lowConfidenceResults, getHashtags };
