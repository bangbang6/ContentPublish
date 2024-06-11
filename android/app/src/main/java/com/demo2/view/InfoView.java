package com.demo2.view;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;
import com.bumptech.glide.Glide;
import com.bumptech.glide.load.resource.bitmap.CircleCrop;
import com.bumptech.glide.load.resource.bitmap.RoundedCorners;
import com.demo2.R;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.events.RCTEventEmitter;


public class InfoView extends LinearLayout implements View.OnClickListener {

    ImageView avatarImg;
    TextView nametxt;
    TextView descTxt;

    TextView changeBtn;

    private String shape = "circle";
    private String url="";
    public InfoView(Context context) {
        super(context);
        initView();
    }

    private void initView(){

        LayoutInflater inflater = LayoutInflater.from(getContext());
        View view = inflater.inflate(R.layout.layout_info_view,null);
        avatarImg = view.findViewById(R.id.img_edit);
        nametxt = view.findViewById(R.id.text_name);

        descTxt = view.findViewById(R.id.txt_desc);
        changeBtn = view.findViewById(R.id.txt_btn);
        changeBtn.setOnClickListener(this);
        LayoutParams lp = new LayoutParams(LayoutParams.MATCH_PARENT,LayoutParams.MATCH_PARENT);
        this.addView(view,lp);
    }

    @Override
    public void onClick(View v){
        if(this.shape == "circle"){
            this.shape = "round";
        }else{
            this.shape = "circle";
        }
        //原生层事件
        Glide.with(this).load(this.url).transform(this.shape == "circle"?new CircleCrop():new RoundedCorners(40)).into(avatarImg);
        WritableMap params = Arguments.createMap();
        params.putString("shape",this.shape);
        ReactContext context = (ReactContext)getContext();
        context.getJSModule(RCTEventEmitter.class).receiveEvent(getId(),"onShapeChange",params);
    }

    public void setAvatar(String url){
        this.url = url;
        Glide.with(this).load(url).transform(new CircleCrop()).into(avatarImg);
    }
    public void setName(String text){
        nametxt.setText(text);
    }
    public void setDesc(String text){
        descTxt.setText(text);

    }
    public void setShape(String shape){
        this.shape = shape;
        Glide.with(this).load(this.url).transform(this.shape == "circle"?new CircleCrop():new RoundedCorners(40)).into(avatarImg);
    }
}
