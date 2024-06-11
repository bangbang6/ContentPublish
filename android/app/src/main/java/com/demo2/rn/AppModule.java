package com.demo2.rn;

import android.app.Activity;
import android.content.Intent;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.demo2.DeviceUtilActivity;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.HashMap;
import java.util.Map;


public class AppModule  extends ReactContextBaseJavaModule  {
    //原生层方法的名称 js层用这个名称调用
    @NonNull
    @Override
    public String getName() {
        return "App";
    }
    public AppModule(@Nullable ReactApplicationContext reactContext){
        super(reactContext);

    }
    //ReactMethod 表示js层调用
    @ReactMethod
    public void openGallery(){
        //打开相册
        //getCurrentActivity 取到当前原生层加载的activity
        if(getCurrentActivity() == null){
            return;
        }
        Activity activity = getCurrentActivity();
        /* 开启Pictures画面Type设定为image */
        Intent intent = new Intent(Intent.ACTION_GET_CONTENT);
        intent.setType("image/*");

        /* 取得相片后返回本画面 */
        activity.startActivityForResult(intent, 1);
    }
    @ReactMethod
    public void getVersionName(Promise promise){
        String versionName = "16.0.0";
        if(versionName == null){
            promise.reject(new Throwable("没有版本信息"));
        }else{
            promise.resolve(versionName);
        }
    }




    // 必须重写 getConstants方法才可以 父类帮助我们写了reactmethod等操作
    @Override
    public Map<String,Object> getConstants(){
        Map map = new HashMap<String,Object>();
        map.put("versionName","16.0.0");
        map.put("versionCode","86");
        return map;
    }
}
