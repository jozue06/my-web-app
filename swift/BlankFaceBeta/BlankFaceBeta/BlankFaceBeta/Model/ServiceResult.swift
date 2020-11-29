//
//  ServiceResult.swift
//  BlankFaceBeta
//
//  Created by Joshua McClung on 11/28/20.
//  Copyright © 2020 Joshua McClung. All rights reserved.
//

import Foundation

struct ServiceResult: Decodable {
    // necessary result items captured in the service result
    let messages: [Message]
}
