package com.demo2.view;

import android.content.Context;
import android.os.Bundle;
import android.os.Vibrator;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.annotation.Nullable;

import com.bumptech.glide.Glide;
import com.bumptech.glide.load.resource.bitmap.CircleCrop;
import com.bumptech.glide.load.resource.bitmap.RoundedCorners;
import com.demo2.R;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.events.RCTEventEmitter;

import cn.bingoogolapple.qrcode.core.QRCodeView;
import cn.bingoogolapple.qrcode.zxing.ZXingView;


public class ScanView extends LinearLayout implements QRCodeView.Delegate {
    ZXingView zXingView = null;
    public ScanView(Context context) {
        super(context);
        initView();
    }

    private void initView(){

        LayoutInflater inflater = LayoutInflater.from(getContext());
        View view = inflater.inflate(R.layout.scan_view,null);
        LinearLayout.LayoutParams lp = new LinearLayout.LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT);
        this.addView(view,lp);
        zXingView = findViewById(R.id.zXingView);
        zXingView.setDelegate(this);
        zXingView.startCamera();
        zXingView.startSpotAndShowRect();
    }






    private void vibrate(){
        Vibrator vibrator = (Vibrator)getContext().getSystemService(Context.VIBRATOR_SERVICE);
        vibrator.vibrate(200);
    }

    @Override
    public void onScanQRCodeSuccess(String result) {
        vibrate();
        ReactContext reactContext  = (ReactContext)getContext();
        WritableMap event = Arguments.createMap();
        event.putString("qrcode",result);
        reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(getId(),"onScanResult",event);
        zXingView.startSpot();
    }


    @Override
    public void onCameraAmbientBrightnessChanged(boolean isDark) {

    }

    @Override
    public void onScanQRCodeOpenCameraError() {

    }
}
