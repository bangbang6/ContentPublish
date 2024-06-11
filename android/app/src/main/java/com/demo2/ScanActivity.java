package com.demo2;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.os.Vibrator;
import android.util.Log;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import com.facebook.react.ReactActivity;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;

import cn.bingoogolapple.qrcode.core.QRCodeView;
import cn.bingoogolapple.qrcode.zxing.ZXingView;

public class ScanActivity extends AppCompatActivity implements QRCodeView.Delegate {
    ZXingView zXingView = null;
    public static Promise promise2 = null;
    public static Promise promise3 = null;
    public static Callback callback2 = null;
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_scan);
        zXingView = findViewById(R.id.zXingView);
        zXingView.setDelegate(this);
    }

    private void vibrate(){
        Vibrator vibrator = (Vibrator)getSystemService(VIBRATOR_SERVICE);
        vibrator.vibrate(200);
    }

    @Override
    public void onScanQRCodeSuccess(String result) {
        vibrate();
        promise2.resolve(result);
//        callback2.invoke(result);
        Log.i("scan",result);
        this.finish();
    }

    @Override
    protected void onStart() {
        zXingView.startCamera();
        zXingView.startSpotAndShowRect();
        super.onStart();
    }

    @Override
    protected void onStop() {
        zXingView.stopCamera();
        super.onStop();
    }

    @Override
    protected void onDestroy() {
        zXingView.onDestroy();
        super.onDestroy();

    }

    @Override
    public void onCameraAmbientBrightnessChanged(boolean isDark) {

    }

    @Override
    public void onScanQRCodeOpenCameraError() {

    }
    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        Log.i("resultCode",resultCode+"");
        if (resultCode == 1) {
            // 获取选择的图片Uri
            Uri selectedImageUri = data.getData();
            // 处理选择的图片
            promise3.resolve(selectedImageUri);

            // ...
        }
    }
}
