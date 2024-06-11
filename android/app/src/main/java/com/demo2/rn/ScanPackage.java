package com.demo2.rn;

import androidx.annotation.NonNull;

import com.demo2.view.InfoViewGroup;
import com.demo2.viewManage.InfoViewGroupManager;
import com.demo2.viewManage.InfoViewManager;
import com.demo2.viewManage.ScanViewManager;
import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.List;

// 实现rn桥接的packages
public class ScanPackage implements ReactPackage {

    // 桥接原生的方法和常量
    @NonNull
    @Override
    public List<NativeModule> createNativeModules(@NonNull ReactApplicationContext reactApplicationContext) {
        List<NativeModule> modules = new ArrayList<>();
        modules.add(new ScanModule(reactApplicationContext));

        return modules;
    }

    // 桥接原生的组件
    @NonNull
    @Override
    public List<ViewManager> createViewManagers(@NonNull ReactApplicationContext reactApplicationContext) {

        List<ViewManager> modules = new ArrayList<>();
        modules.add(new ScanViewManager());
        return modules;
    }
}
