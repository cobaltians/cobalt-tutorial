//
//  CreateViewController.m
//  Cobalt Tutorial
//
//  Created by Sébastien Vitard on 15/03/2017.
//  Copyright © 2017 Cobaltians. All rights reserved.
//

#import "CreateViewController.h"

#import "PlaceAnnotation.h"

@interface CreateViewController () {
    PlaceAnnotation *_annotation;
}

@end

@implementation CreateViewController

////////////////////////////////////////////////////////////////////////////////////////////////

#pragma mark -
#pragma mark LIFECYCLE

////////////////////////////////////////////////////////////////////////////////////////////////

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view from its nib.
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

////////////////////////////////////////////////////////////////////////////////////////////////

#pragma mark -
#pragma mark COBALT

////////////////////////////////////////////////////////////////////////////////////////////////

- (BOOL)onUnhandledMessage:(NSDictionary *)message {
    return NO;
}

- (BOOL)onUnhandledEvent:(NSString *)event
                withData:(NSDictionary *)data
             andCallback:(NSString *)callback {
    if ([@"setPlace" isEqualToString:event]) {
        if (data != nil) {
            NSString *place = [data objectForKey:@"place"];
            if (place != nil) {
                [self setPlace:place];
            }
            else {
                NSLog(@"CreateViewController - onUnhandledEvent:%@ missing place field", event);
            }
        }
        else {
            NSLog(@"CreateViewController - onUnhandledEvent:%@ empty data", event);
        }
        
        return YES;
    }
    
    return NO;
}

- (BOOL)onUnhandledCallback:(NSString *)callback
                   withData:(NSDictionary *)data {
    return NO;
}

////////////////////////////////////////////////////////////////////////////////////////////////

#pragma mark -
#pragma mark HELPERS

////////////////////////////////////////////////////////////////////////////////////////////////

- (void)setPlace:(NSString *)place {
    
}

- (void)onPlaceChanged:(NSString *) place {
    // Add event to web here.
    [self sendEvent:@"setPlace"
           withData:@{@"place": place}
        andCallback:nil];
}

////////////////////////////////////////////////////////////////////////////////////////////////

#pragma mark -
#pragma mark MAP VIEW DELEGATE

////////////////////////////////////////////////////////////////////////////////////////////////

- (void)mapViewDidFinishLoadingMap:(MKMapView *)mapView {
    /*
    _annotation = [[PlaceAnnotation alloc] init];
    _annotation.coordinate = CLLocationCoordinate2DMake(48.732041, -3.459063);
    _annotation.title = @"Lannion";
    [_mapView addAnnotation:_annotation];
    */
    [_mapView setCamera:[MKMapCamera cameraLookingAtCenterCoordinate:CLLocationCoordinate2DMake(48.732041, -3.459063)
                                                        fromDistance:300000.0
                                                               pitch:0.0
                                                             heading:0.0]
               animated:YES];
    
    UILongPressGestureRecognizer *longPressGestureRecognizer = [[UILongPressGestureRecognizer alloc] initWithTarget:self
                                                                                                             action:@selector(onMapLongPress:)];
    [_mapView addGestureRecognizer:longPressGestureRecognizer];
}

- (void)onMapLongPress:(UILongPressGestureRecognizer *)sender {
    if (sender.state == UIGestureRecognizerStateBegan) {
        [self onPlaceChanged:@"Unknown"];
    }
}

@end
