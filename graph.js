'use strict';

const bad = [78, 80, 53, 44, 82, 87, 101, 84, 91, 60];

const disappointing = [46, 68, 86];

const mediocre = [14, 15, 28, 52, 76, 57, 100, 96, 107, 109];

const favorable = [41, 45, 115, 98, 103, 72, 85, 109, 113];

const great = [111, 50, 43, 90];

const graph = {
    nodes: d3.range(3, 115).map((pageNum) => {
        let group = 1;

        if (bad.indexOf(pageNum) > -1) {
            group = 19;
        }

        if (disappointing.indexOf(pageNum) > -1) {
            group = 16;
        }

        if (mediocre.indexOf(pageNum) > -1) {
            group = 12;
        }

        if (favorable.indexOf(pageNum) > -1) {
            group = 8;
        }

        if (great.indexOf(pageNum) > -1) {
            group = 4;
        }

        return {
            id: pageNum,
            group,
        };
    }),
    links: [
        {
            source: 3,
            target: 4,
            value: 1
        },
        {
            source: 3,
            target: 5,
            value: 1
        },
        {
            source: 4,
            target: 10,
            value: 1
        },
        {
            source: 4,
            target: 8,
            value: 1
        },
        {
            source: 5,
            target: 16,
            value: 1
        },
        {
            source: 5,
            target: 6,
            value: 1
        },
        {
            source: 6,
            target: 114,
            value: 1
        },
        {
            source: 6,
            target: 22,
            value: 1
        },
        {
            source: 8,
            target: 17,
            value: 1,
        },
        {
            source: 8,
            target: 18,
            value: 1,
        },
        {
            source: 10,
            target: 21,
            value: 1,
        },
        {
            source: 10,
            target: 61,
            value: 1,
        },
        {
            source: 12,
            target: 66,
            value: 1,
        },
        {
            source: 12,
            target: 78,
            value: 1,
        },
        {
            source: 13,
            target: 14,
            value: 1,
        },
        {
            source: 13,
            target: 15,
            value: 1,
        },
        {
            source: 16,
            target: 24,
            value: 1,
        },
        {
            source: 16,
            target: 25,
        },
        {
            source: 17,
            target: 26,
        },
        {
            source: 17,
            target: 28,
        },
        {
            source: 18,
            target: 29,
        },
        {
            source: 18,
            target: 30,
        },
        {
            source: 21,
            target: 33,
        },
        {
            source: 21,
            target: 35,
        },
        {
            source: 22,
            target: 36,
        },
        {
            source: 22,
            target: 37,
        },
        {
            source: 24,
            target: 38,
        },
        {
            source: 24,
            target: 40,
        },
        {
            source: 25,
            target: 41,
        },
        {
            source: 25,
            target: 43
        },
        {
            source: 25,
            target: 44,
        },
        {
            source: 25,
            target: 45,
        },
        {
            source: 26,
            target: 46,
        },
        {
            source: 26,
            target: 47,
        },
        {
            source: 29,
            target: 52,
        },
        {
            source: 29,
            target: 53,
        },
        {
            source: 30,
            target: 54
        },
        {
            source: 30,
            target: 92
        },
        {
            source: 33,
            target: 68,
        },
        {
            source: 33,
            target: 79,
        },
        {
            source: 35,
            target: 76,
        },
        {
            source: 35,
            target: 80,
        },
    ],
};
