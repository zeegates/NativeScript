import * as commonTests from "./view-tests-common";

import { View } from "tns-core-modules/ui/core/view";
import { Button } from "tns-core-modules/ui/button";
import { StackLayout } from "tns-core-modules/ui/layouts/stack-layout/stack-layout";
import * as helper from "../helper";
import * as TKUnit from "../../TKUnit";
import * as utils from "tns-core-modules/utils/utils";

export function test_event_LayoutChanged_GetActualSize() {
    const test = function (views: Array<View>) {
        let buttonLayoutChanged = false;

        views[1].on(View.layoutChangedEvent, (data) => {
            buttonLayoutChanged = true;
        });

        TKUnit.waitUntilReady(() => buttonLayoutChanged, 5);
        TKUnit.assert(views[1].getActualSize().height > 0);
        TKUnit.assert(views[1].getActualSize().width > 0);
    };

    helper.do_PageTest_WithStackLayout_AndButton(test);
};

export function test_event_LayoutChanged_Listeners() {
    const test = function (views: Array<View>) {
        let stackLayoutChanged = false;
        let buttonLayoutChanged = false;

        views[1].on(View.layoutChangedEvent, (data) => {
            buttonLayoutChanged = true;
        });

        TKUnit.waitUntilReady(() => buttonLayoutChanged, 5);
        TKUnit.assertFalse(views[0].hasListeners(View.layoutChangedEvent));
        TKUnit.assert(views[1].hasListeners(View.layoutChangedEvent));
    };

    helper.do_PageTest_WithStackLayout_AndButton(test);
};

export function test_event_LayoutChanged_IsRaised() {
    helper.clearPage();
    let newPage = helper.getCurrentPage();

    let stackLayoutChanged = false;
    let buttonLayoutChanged = false;

    let stackLayout = new StackLayout();
    let button = new Button();

    stackLayout.on(View.layoutChangedEvent, (data) => {
        stackLayoutChanged = true;
    });

    button.on(View.layoutChangedEvent, (data) => {
        buttonLayoutChanged = true;
    });

    stackLayout.addChild(button);
    newPage.content = stackLayout;

    TKUnit.waitUntilReady(() => stackLayoutChanged && buttonLayoutChanged, 5);
    TKUnit.assert(stackLayoutChanged);
    TKUnit.assert(buttonLayoutChanged);

    newPage.content = null;
};

export function test_event_LayoutChanged_IsRaised_ChildMarginChanged() {
    const test = function (views: Array<View>) {
        let stackLayoutChanged = false;
        let buttonLayoutChanged = false;

        views[1].on(View.layoutChangedEvent, (data) => {
            stackLayoutChanged = true;
        });

        views[2].on(View.layoutChangedEvent, (data) => {
            buttonLayoutChanged = true;
        });

        (<Button>views[2]).marginTop = 50;

        TKUnit.waitUntilReady(() => buttonLayoutChanged, 5);

        TKUnit.assert(stackLayoutChanged);
        TKUnit.assert(buttonLayoutChanged);
    };

    helper.do_PageTest_WithStackLayout_AndButton(test);
};

export function test_event_LayoutChanged_IsRaised_ParentMarginChanged() {
    const test = function (views: Array<View>) {
        let stackLayoutChanged = false;
        let buttonLayoutChanged = false;

        views[1].on(View.layoutChangedEvent, (data) => {
            stackLayoutChanged = true;
        });

        views[2].on(View.layoutChangedEvent, (data) => {
            buttonLayoutChanged = true;
        });

        (<Button>views[2]).marginTop = 50;

        TKUnit.waitUntilReady(() => buttonLayoutChanged, 5);

        TKUnit.assert(stackLayoutChanged);
        TKUnit.assert(buttonLayoutChanged);
    };

    helper.do_PageTest_WithStackLayout_AndButton(test);
};

export function test_event_LayoutChanged_IsNotRaised_TransformChanged() {
    const test = function (views: Array<View>) {
        let stackLayoutChangedCount = 0;
        let buttonLayoutChangedCount = 0;
        const button = <Button>views[2];

        views[1].on(View.layoutChangedEvent, (data) => {
            stackLayoutChangedCount++;
        });

        button.on(View.layoutChangedEvent, (data) => {
            buttonLayoutChangedCount++;
        });

        button.translateX += 50;
        button.translateY += 50;
        button.rotate += 50;
        button.height = 200;

        TKUnit.waitUntilReady(() => button.height === 200, 5);

        TKUnit.assertEqual(stackLayoutChangedCount, 1);
        TKUnit.assertEqual(buttonLayoutChangedCount, 1);
    };

    helper.do_PageTest_WithStackLayout_AndButton(test);
};

export function test_event_LayoutChanged_IsRaised_StackLayout_SizeChanged() {
    const test = function (views: Array<View>) {
        let stackLayoutChanged = false;
        let buttonLayoutChanged = false;

        views[1].on(View.layoutChangedEvent, (data) => {
            stackLayoutChanged = true;
        });

        views[2].on(View.layoutChangedEvent, (data) => {
            buttonLayoutChanged = true;
        });

        (<StackLayout>views[1]).height = 100;

        TKUnit.waitUntilReady(() => buttonLayoutChanged, 5);

        TKUnit.assert(stackLayoutChanged);
        TKUnit.assert(buttonLayoutChanged);
    };

    helper.do_PageTest_WithStackLayout_AndButton(test);
};
