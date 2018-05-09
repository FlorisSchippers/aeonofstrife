import React from 'react';
import Parser, {processNodes} from 'react-html-parser';
import {Html5Entities} from 'html-entities';
import {Link} from 'react-router-dom';

const entities = new Html5Entities();

function transform(node) {
    if (node.type === 'tag' && node.name === 'a') {
        const {href, ...attributes} = node.attribs;
        // TODO: find unique key.
        return (
            <Link
                key={href}
                to={href} {...attributes}
            >
                {processNodes(node.children, transform)}
            </Link>
        );
    }
    return undefined;
}

const parser = (string) => {
    const decoded = entities.decode(string);
    return Parser(decoded, {transform});
};

export default parser;
