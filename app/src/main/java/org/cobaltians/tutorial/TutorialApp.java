package org.cobaltians.tutorial;

import android.app.Application;

import org.cobaltians.cobalt.Cobalt;

public final class TutorialApp extends Application {

    @Override
    public void onCreate() {
        super.onCreate();

        Cobalt.DEBUG = true;
        Cobalt.getInstance(this).setResourcePath("common/");
    }
}
