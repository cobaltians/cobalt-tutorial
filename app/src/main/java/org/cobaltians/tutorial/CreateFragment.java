package org.cobaltians.tutorial;

import org.cobaltians.cobalt.fragments.CobaltFragment;
import org.json.JSONObject;

public class CreateFragment extends CobaltFragment {

    @Override
    protected boolean onUnhandledCallback(String callback, JSONObject data) {
        return false;
    }

    @Override
    protected boolean onUnhandledEvent(String event, JSONObject data, String callback) {
        return false;
    }

    @Override
    protected boolean onUnhandledMessage(JSONObject message) {
        return false;
    }

    public void onResetButtonClicked() {
        sendEvent("resetEvent", null, null);
    }
}
