package org.cobaltians.tutorial;

import android.location.Address;
import android.location.Geocoder;
import android.os.Bundle;
import android.util.Log;
import android.widget.Toast;

import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.Marker;
import com.google.android.gms.maps.model.MarkerOptions;

import org.cobaltians.cobalt.Cobalt;
import org.cobaltians.cobalt.activities.CobaltActivity;
import org.cobaltians.cobalt.fragments.CobaltFragment;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.util.List;

public class CreateActivity extends CobaltActivity implements OnMapReadyCallback, GoogleMap.OnMapLongClickListener {

    protected static final String TAG = CreateActivity.class.getSimpleName();

    private GoogleMap mMap;
    private Marker mMarker;

    /***********************************************************************************************
     *
     * LIFECYCLE
     *
     **********************************************************************************************/

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        if (savedInstanceState == null) {
            ((SupportMapFragment) getSupportFragmentManager().findFragmentById(R.id.map)).getMapAsync(this);
        }
    }

    /***********************************************************************************************
     *
     * COBALT
     *
     **********************************************************************************************/

    @Override
    protected int getLayoutToInflate() {
        return R.layout.activity_create;
    }

    @Override
    protected CobaltFragment getFragment() {
        return Cobalt.getInstance(this).getFragmentForController(CreateFragment.class, "create", "addEvent.html");
    }

    /***********************************************************************************************
     *
     * MAPS
     *
     **********************************************************************************************/

    @Override
    public void onMapReady(GoogleMap googleMap) {
        mMap = googleMap;

        mMap.setOnMapLongClickListener(this);

        LatLng latLng = new LatLng(48.732041, -3.459063);
        mMarker = mMap.addMarker(new MarkerOptions().position(latLng).title("Lannion"));
        mMap.moveCamera(CameraUpdateFactory.newLatLngZoom(latLng, 7));

        try {
            JSONObject data = new JSONObject();
            data.put("place", "Lannion");
            ((CreateFragment) getSupportFragmentManager().findFragmentById(R.id.fragment_container)).sendEvent("focusMapOn", data, null);
        }
        catch (JSONException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void onMapLongClick(LatLng latLng) {
        String place = "Unknown";
        try {
            List<Address> addresses = new Geocoder(this).getFromLocation(latLng.latitude, latLng.longitude, 1);
            String locality = (addresses.isEmpty() ? null : addresses.get(0).getLocality());
            if (locality != null) {
                place = locality;
            }
        }
        catch (IOException e) {
            Log.i(TAG, "onMapLongClick: network unavailable");
            e.printStackTrace();
        }

        mMarker.setPosition(latLng);
        mMarker.setTitle(place);

        try {
            JSONObject data = new JSONObject();
            data.put("place", place);
            ((CreateFragment) getSupportFragmentManager().findFragmentById(R.id.fragment_container)).sendEvent("focusMapOn", data, null);
        }
        catch (JSONException e) {
            e.printStackTrace();
        }
    }

    /***********************************************************************************************
     *
     * HELPERS
     *
     **********************************************************************************************/

    void focusOnThisFuckingPlace(String place) {
        try {
            List<Address> addresses = new Geocoder(this).getFromLocationName(place, 1);
            if (! addresses.isEmpty()) {
                Address address = addresses.get(0);

                LatLng latLng = new LatLng(address.getLatitude(), address.getLongitude());
                mMarker.setPosition(latLng);
                mMarker.setTitle(place);
                mMap.moveCamera(CameraUpdateFactory.newLatLng(latLng));
            }
            else {
                Toast.makeText(this, "No address found", Toast.LENGTH_LONG);
            }
        }
        catch (IOException e) {
            Toast.makeText(this, "Network unavailable", Toast.LENGTH_SHORT).show();
            Log.i(TAG, "focusOnThisFuckingPlace: network unavailable");
            e.printStackTrace();
        }
    }
}
