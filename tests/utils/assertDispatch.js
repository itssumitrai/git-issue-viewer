/* globals before, beforeEach, it, describe */
/**
 * Copyright 2016, Sumit Rai
 * Copyrights licensed under the New MIT License. See the accompanying LICENSE file for terms.
 */

'use strict';

import { expect } from 'chai';

export default function assertDispatch(context, action, actionParams, actionCallback, expectedEvents, expectedPayload) {
    action(context, actionParams, actionCallback);
    expect(context.dispatchCalls.length).to.equal(expectedEvents.length);
    context.dispatchCalls.forEach(function iterateDispactedCalls(event, index) {
        expect(context.dispatchCalls[index].name).to.equal(expectedEvents[index]);
        expect(context.dispatchCalls[index].payload).to.deep.equal(expectedPayload[index]);
    });
};