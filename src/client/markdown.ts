/**
 * Copyright 2017-present Palantir Technologies, Inc. All rights reserved.
 * Licensed under the BSD-3 License as modified (the “License”); you may obtain
 * a copy of the license in the LICENSE and PATENTS files in the root of this
 * repository.
 */

import { IBlock } from "./compiler";
import { INavigable } from "./tags";

export interface IMarkdownPluginData {
    /**
     * An ordered, nested, multi-rooted tree describing the navigation layout
     * of all the pages and their headings. Uses `@page` and `@#+` tags to build
     * this representation.
     */
    nav: IPageNode[];

    /** A map of page reference to data. */
    pages: {
        [reference: string]: IPageData;
    };
}

/**
 * A single Documentalist page, parsed from a single source file.
 */
export interface IPageData extends IBlock {
    /** Unique identifier for addressing this page. */
    reference: string;

    /** Fully qualified route to this page: slash-separated references of all parent pages. */
    route: string;

    /** Human-friendly title of this page. */
    title: string;
}

/** An `@#+` tag belongs to a specific page. */
export interface IHeadingNode extends INavigable {
    /** Display title of page heading. */
    title: string;
}

/** A page has ordered children composed of `@#+` and `@page` tags. */
export interface IPageNode extends IHeadingNode {
    /** Ordered list of pages and headings that appear on this page. */
    children: Array<IPageNode | IHeadingNode>;

    /** Unique reference of this page, used for retrieval from store. */
    reference: string;
}
