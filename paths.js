function is(needle, group) {
    return group.indexOf(needle) > -1;
}

function getChoicesFromNode(node) {
    const paths = graph.links
        .filter(({ source }) => source === node)
        .map(({ target }) => getChoicesFromNode(target));

    const leaves = paths.filter(({ paths }) => paths.length === 0)
        .map(({ node }) => node)
        .concat(
            paths.reduce(
                (memo, { leaves }) => memo.concat(leaves),
                []
            )
        )
        .sort((a, b) => {
            if (a < b) {
                return -1;
            }
            if (a > b) {
                return 1;
            }
            // a must be equal to b
            return 0;
        });

    return {
        node,
        paths,
        leaves,
        bad: leaves.filter((node) => bad.indexOf(node) > -1),
        disappointing: leaves.filter((node) => disappointing.indexOf(node) > -1),
        mediocre: leaves.filter((node) => mediocre.indexOf(node) > -1),
        favorable: leaves.filter((node) => favorable.indexOf(node) > -1),
        great: leaves.filter((node) => great.indexOf(node) > -1),
    };
}

const startEl = document.getElementById('info');

function getBlock(count, total, offset, color, label) {
    const block = document.createElementNS('http://www.w3.org/2000/svg', 'rect');

    block.setAttributeNS(null, 'x', (offset / total * 100) || 0);
    block.setAttributeNS(null, 'y', 0);
    block.setAttributeNS(null, 'height', 20);
    block.setAttributeNS(null, 'width', (count / total * 100) || 0);
    block.setAttributeNS(null, 'fill', color);

    const title = document.createElementNS('http://www.w3.org/2000/svg', 'title');

    title.innerHTML = `${label}: ${count / total * 100}%`;

    block.appendChild(title);

    return block;
}

function addGraph(el, path) {
    if (!path.leaves.length)
        return;

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

    svg.setAttribute('height', 20);
    svg.setAttribute('width', 100);
    svg.style.border = '1px solid black';

    const bad = getBlock(path.bad.length, path.leaves.length, 0, 'black', 'Bad');
    const disappointing = getBlock(
        path.disappointing.length,
        path.leaves.length,
        path.bad.length,
        'red',
        'Disappointing'
    );
    const mediocre = getBlock(
        path.mediocre.length,
        path.leaves.length,
        path.bad.length + path.disappointing.length,
        'orange',
        'Mediocre'
    );

    const favorable = getBlock(
        path.favorable.length,
        path.leaves.length,
        path.bad.length + path.disappointing.length + path.mediocre.length,
        'yellow',
        'Favorable'
    );

    const great = getBlock(
        path.great.length,
        path.leaves.length,
        path.bad.length + path.disappointing.length + path.mediocre.length + path.favorable.length,
        'green',
        'Great'
    );

    svg.appendChild(bad);
    svg.appendChild(disappointing);
    svg.appendChild(mediocre);
    svg.appendChild(favorable);
    svg.appendChild(great);

    el.appendChild(svg);
}

function getInner(path) {
    if (!path.leaves.length) {
        let type = 'unknown';

        if (is(path.node, bad)) {
            type = 'bad';
        } else if (is(path.node, disappointing)) {
            type = 'disappointing';
        } else if (is(path.node, mediocre)) {
            type = 'mediocre';
        } else if (is(path.node, favorable)) {
            type = 'favorable';
        } else if (is(path.node, great)) {
            type = 'great';
        }

        return [
            `node: ${path.node}`,
            `type: ${type}`,
        ]
            .join('\n');
    }

    return [
        `node: ${path.node}`,
        path.leaves.length > 0 && `leaves: ${path.leaves}`,
        `bad: ${path.bad}`,
        `disappointing: ${path.disappointing}`,
        `mediocre: ${path.mediocre}`,
        `favorable: ${path.favorable}`,
        `great: ${path.great}`,
    ]
        .filter((value) => !!value)
        .join('\n');
}

function addToTree(parent, paths) {
    const ul = document.createElement('ul');

    paths.forEach((path) => {
        const el = document.createElement('li');
        const pre = document.createElement('pre');
        const code = document.createElement('code');

        code.innerHTML = getInner(path);

        pre.appendChild(code);
        el.appendChild(pre);

        addGraph(el, path);

        addToTree(el, path.paths);

        ul.appendChild(el);
    });

    parent.appendChild(ul);
}

addToTree(startEl, [getChoicesFromNode(3)]);
