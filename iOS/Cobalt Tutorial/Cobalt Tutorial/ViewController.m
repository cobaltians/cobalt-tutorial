//
//  ViewController.m
//  Cobalt Tutorial
//
//  Created by Sébastien Vitard on 15/03/2017.
//  Copyright © 2017 Cobaltians. All rights reserved.
//

#import "ViewController.h"

@interface ViewController ()

@end

@implementation ViewController

////////////////////////////////////////////////////////////////////////////////////////////////

#pragma mark -
#pragma mark LIFECYCLE

////////////////////////////////////////////////////////////////////////////////////////////////

- (id)initWithCoder:(NSCoder *)aDecoder {
    if (self = [super initWithCoder:aDecoder]) {
        NSString *resourcePath = [NSString stringWithFormat:@"%@%@", [[NSBundle mainBundle] resourcePath], @"/common/"];
        [Cobalt setResourcePath:resourcePath];
        
        [self initWithPage:@"index.html"
             andController:@"default"];
    }
    
    return self;
}

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view, typically from a nib.
}


- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

////////////////////////////////////////////////////////////////////////////////////////////////

#pragma mark -
#pragma mark COBALT

////////////////////////////////////////////////////////////////////////////////////////////////

- (IBAction)showMap:(id)sender {
    [self.navigationController pushViewController:[Cobalt cobaltViewControllerForController:@"event"
                                                                                    andPage:@"event.html"]
                                         animated:YES];
}

- (BOOL)onUnhandledMessage:(NSDictionary *)message {
    return NO;
}

- (BOOL)onUnhandledEvent:(NSString *)event
                withData:(NSDictionary *)data
             andCallback:(NSString *)callback {
    return NO;
}

- (BOOL)onUnhandledCallback:(NSString *)callback
                   withData:(NSDictionary *)data {
    return NO;
}

@end
