//
//  Message.swift
//  BlankFaceBeta
//
//  Created by Joshua McClung on 11/28/20.
//  Copyright © 2020 Joshua McClung. All rights reserved.
//

import Foundation

struct Message: Hashable, Encodable {
    let username: String
    let message: String
}

struct DecodableMessage: Decodable {
    let username: String
    let message: String
}

struct Messages {
    static let messages = [Message]()
}
