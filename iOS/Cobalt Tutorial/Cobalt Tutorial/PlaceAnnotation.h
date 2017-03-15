//
//  PlaceAnnotation.h
//  Cobalt Tutorial
//
//  Created by Sébastien Vitard on 15/03/2017.
//  Copyright © 2017 Cobaltians. All rights reserved.
//

#import <MapKit/MapKit.h>

@interface PlaceAnnotation : NSObject <MKAnnotation>

@property (nonatomic, assign) CLLocationCoordinate2D coordinate;
@property (nonatomic, copy) NSString *title;

@end


