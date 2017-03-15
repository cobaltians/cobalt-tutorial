package org.cobaltians.tutorial;

import android.util.Log;

import org.cobaltians.cobalt.fragments.CobaltFragment;
import org.json.JSONException;
import org.json.JSONObject;

public class CreateFragment extends CobaltFragment {

    protected static final String TAG = CreateFragment.class.getSimpleName();

    /***********************************************************************************************
     *
     * COBALT
     *
     **********************************************************************************************/

    @Override
    protected boolean onUnhandledCallback(String callback, JSONObject data) {
        return false;
    }

    @Override
    protected boolean onUnhandledEvent(String event, JSONObject data, String callback) {
        if ("setPlace".equals(event)) {
            try {
                ((CreateActivity) mContext).focusOnThisFuckingPlace(data.getString("place"));
            }
            catch (JSONException e) {
                Log.w(TAG, "onUnhandledEvent - setPlace: no place field in data");
                e.printStackTrace();
            }
            return true;
        }
        return false;
    }

    @Override
    protected boolean onUnhandledMessage(JSONObject message) {
        return false;
    }
}
