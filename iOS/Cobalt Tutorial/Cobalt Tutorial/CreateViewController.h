//
//  CreateViewController.h
//  Cobalt Tutorial
//
//  Created by Sébastien Vitard on 15/03/2017.
//  Copyright © 2017 Cobaltians. All rights reserved.
//

#import <MapKit/MapKit.h>
#import <Cobalt/Cobalt.h>

@interface CreateViewController : CobaltViewController <CobaltDelegate, MKMapViewDelegate>

@property (strong, nonatomic) IBOutlet MKMapView *mapView;

@end
