package com.demo2.viewManage;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.demo2.view.InfoView;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

import java.util.Map;

public class InfoViewManager extends SimpleViewManager<InfoView> {
    @NonNull
    @Override
    public String getName() {
        return "NativeInfoView";
    }

    @NonNull
    @Override
    protected InfoView createViewInstance(@NonNull ThemedReactContext context) {
        return new InfoView(context);
    }
    @ReactProp(name="avatar")
    public void setAvatar(InfoView infoView,String url){
        infoView.setAvatar(url);
    }
    @ReactProp(name="name")
    public void setName(InfoView infoView,String text){
        infoView.setDesc(text);
    }
    @ReactProp(name="desc")
    public void setDesc(InfoView infoView,String text){
        infoView.setDesc(text);
    }

    @Nullable
    @Override
    public Map getExportedCustomBubblingEventTypeConstants() {
        return MapBuilder.builder().put("onShapeChange",MapBuilder.of("phasedRegistrationNames",MapBuilder.of("bubbled","onShapeChange"))).build();
    }

    @Nullable
    @Override
    public Map<String, Integer> getCommandsMap() {
        // command string转成 数值编码
        return MapBuilder.of("setShape",SET_SHAPE_CODE);
    }

    @Override
    public void receiveCommand(@NonNull InfoView view, String commandId, @Nullable ReadableArray args) {
        int command = Integer.parseInt(commandId);
        if(command == SET_SHAPE_CODE){
            String shape = args.getString(0);
            view.setShape(shape);
        }else{
            super.receiveCommand(view, commandId, args);
        }


    }

    public static final int SET_SHAPE_CODE = 100;
}

