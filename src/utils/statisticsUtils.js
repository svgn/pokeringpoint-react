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
