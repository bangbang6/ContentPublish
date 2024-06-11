package com.demo2.rn;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.demo2.ScanActivity;
import com.facebook.react.BuildConfig;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.HashMap;
import java.util.Map;


public class ScanModule  extends ReactContextBaseJavaModule {
    //原生层方法的名称 js层用这个名称调用
    @NonNull
    @Override
    public String getName() {
        return "ScanModule";
    }
    public ScanModule(@Nullable ReactApplicationContext reactContext){
        super(reactContext);

    }
    @ReactMethod
    public void startScan(Promise promise){
        Activity activity=getCurrentActivity();
        if(activity == null){
            return;
        }
        ScanActivity.promise2 = promise;
        Intent intent = new Intent(activity, ScanActivity.class);
        activity.startActivity(intent);
    }
    @ReactMethod
    public void startScan2(Callback callback){
        Activity activity=getCurrentActivity();
        if(activity == null){
            return;
        }
        ScanActivity.callback2 = callback;
        Intent intent = new Intent(activity, ScanActivity.class);
        activity.startActivity(intent);
    }
    @ReactMethod
    public void openGallery(Promise promise){
        //打开相册
        //getCurrentActivity 取到当前原生层加载的activity
        if(getCurrentActivity() == null){
            return;
        }
        Activity activity = getCurrentActivity();
        /* 开启Pictures画面Type设定为image */
        Intent intent = new Intent(Intent.ACTION_GET_CONTENT);
        intent.setType("image/*");
        ScanActivity.promise3 = promise;
        /* 取得相片后返回本画面 */
        activity.startActivityForResult(intent, 1);
    }
}
