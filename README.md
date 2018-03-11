# Mithril Lifecycle Explorer

## What

A playground to demonstrate lifecycle sequence in [Mithril](https://mithril.js.org/). The playground consists of a recursive `Node` component structure, each `Node` being able to add and remove further `Node` children which will receive a key indicating their position withing the tree. A log indicates when each `Node`'s lifecycle methods fire. 

## Why

This is intended as an intuitive demonstration to help understand how and when the various lifecycle methods in an arbitrary virtual DOM tree. The source code should also prove of interest in understanding how to build recursive UI structures and conditional render logic (among other things) in Mithril apps.

## How

Load `index.html` in the browser. This repository is published online at [`https://barneycarroll.github.io/mle`](https://barneycarroll.github.io/mle).

The app starts with a single root `Node`, and the log displays the initial lifecycle logs for that `Node`. Click the `+` button in `Node 1` to create another...
