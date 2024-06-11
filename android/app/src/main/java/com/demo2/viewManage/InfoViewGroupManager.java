package com.demo2.viewManage;

import androidx.annotation.NonNull;

import com.demo2.view.InfoViewGroup;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;

public class InfoViewGroupManager extends ViewGroupManager<InfoViewGroup> {
    @NonNull
    @Override
    public String getName() {
        return "InfoViewGroupManager";
    }

    @NonNull
    @Override
    protected InfoViewGroup createViewInstance(@NonNull ThemedReactContext themedReactContext) {
        return new InfoViewGroup(themedReactContext);
    }
}
