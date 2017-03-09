package org.cobaltians.tutorial;

import org.cobaltians.cobalt.Cobalt;
import org.cobaltians.cobalt.activities.CobaltActivity;
import org.cobaltians.cobalt.fragments.CobaltFragment;

public class CreateActivity extends CobaltActivity {

    @Override
    protected CobaltFragment getFragment() {
        return Cobalt.getInstance(this).getFragmentForController(CreateFragment.class, "create", "addEvent.html");
    }
}
