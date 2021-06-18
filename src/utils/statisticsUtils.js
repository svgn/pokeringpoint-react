export const groupVotes = (votes) => {
    const buckets = new Map();
    votes = votes.filter(vote => vote !== null);
    votes.forEach((item, index) => {
        if (buckets.has(item)) {
            let count = buckets.get(item);
            count += 1;
            buckets.set(item, count);
        } else {
            buckets.set(item, 1);
        }
    });

    return Array.from(buckets).sort(([vote1, count1], [vote2, count2]) => count2 - count1);
}

export const getTheModes = (votes) => {
    const modes = groupVotes(votes);
    if (modes.length === 0) {
        return [];
    }

    const [, modeCount] = modes[0];
    return modes.filter(([vote, count]) => count === modeCount);
}

export const getSuggestedMode = (votes) => {
    if (votes.length === 0) {
        return 0;
    }

    const average = getAverage(votes);
    console.log(average);
    return votes.reduce((prev, curr) => Math.abs(curr - average < Math.abs(prev - average) ? curr : prev));
}

const getAverage = (votes) => {
    if (votes.length === 0) {
        return 0;
    }

    return votes.reduce((acc, vote) => acc + vote, 0) / votes.length;
}