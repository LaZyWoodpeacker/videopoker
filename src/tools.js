export const splitCardName = name => {
    const parsed = /^(spades|clubs|diamonds|hearts)(\w+)$/.exec(name);
    if (parsed && parsed.length === 3) {
        const [_, suit, num] = parsed;
        let amount = parseInt(num);
        if (isNaN(amount)) {
            if (num === 'Jack') amount = 11;
            if (num === 'Queen') amount = 12;
            if (num === 'King') amount = 13;
            if (num === 'Ace') amount = 14;
        }
        return { suit, num, amount }
    }
    return { suit: name, num: 0, amount: 0 }
}

export const checkTable = table => {
    let max = 0;
    let flash = false;
    const variants = table.reduce((acc, em) => {
        const amount = em.data.values.v.amount;
        if (amount in acc) acc[amount] += 1
        else acc[amount] = 1
        if (max < amount) max = amount
        return acc;
    }, {});
    const els = Object.keys(variants);
    const score = {
        message: 'NoMessage'
    };

    if (els.length === 5) {
        score.message = "HiCard";
        score.atr = max;
        const sorted = table.map(e => e.amount);
        const arrange = ([...table].sort((a, b) => a.data.values.v.amount - b.data.values.v.amount).filter((e, i) => {
            return (e.data.values.v.amount === max - 4 + i);
        }).length === 5);
        const flash = table.filter(em => em.data.values.v.suit === table[0].data.values.v.suit).length === 5;
        if (arrange && !flash) {
            score.message = "Straight";
            score.atr = max;
        } else if (!arrange && flash) {
            score.message = "Flush";
            score.atr = max;
        } else if (arrange && flash) {
            score.message = (max === 14) ? "RoyalFlush" : "StraightFlush";
            score.atr = max;
        }
    }
    else if (els.length === 4) {
        score.message = "OnePair";
        score.atr = max;
    }
    else if (els.length === 3) {
        if (els.find(em => variants[em] === 3)) {
            score.message = "Set";
            score.atr = max;
        }
        else {
            score.message = "TwoPair";
            score.atr = els.filter(em => variants[em] === 2);
        }
    } else if (els.length === 2) {
        if (els.find(em => variants[em] === 3)) {
            score.message = "FullHouse";
            score.atr = max;
        } else {
            score.message = "FourKind";
            score.atr = max;
        }
    }
    return { message: score.message, atr: score.atr, variants };
}
