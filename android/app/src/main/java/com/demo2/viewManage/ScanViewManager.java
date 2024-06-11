package com.demo2.viewManage;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.demo2.view.InfoView;
import com.demo2.view.ScanView;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.ReactStylesDiffMap;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.StateWrapper;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

import java.util.Map;

public class ScanViewManager extends SimpleViewManager<ScanView> {
    @NonNull
    @Override
    public String getName() {
        return "ScanView";
    }

    @NonNull
    @Override
    protected ScanView createViewInstance(@NonNull ThemedReactContext context) {
        return new ScanView(context);
    }
    @Nullable
    @Override
    public Map getExportedCustomBubblingEventTypeConstants() {
        return MapBuilder.builder().put("onScanResult",MapBuilder.of("phasedRegistrationNames",MapBuilder.of("bubbled","onScanResult"))).build();
    }

}

