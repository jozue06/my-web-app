//
//  File.swift
//  BlankFaceBeta
//
//  Created by Joshua McClung on 11/28/20.
//  Copyright © 2020 Joshua McClung. All rights reserved.
//

import Foundation

class Service {
    
    static let shared = Service() // singleton
    
    func getMessagesFromServer(completion: @escaping ([Message], Error?) -> Void) {
        let urlString = "http://localhost:3001/messages"
         guard let url = URL(string: urlString) else {return}
       
        URLSession.shared.dataTask(with: url) { (data, _, err) in
        if let err = err {
            print("Failed to fetch apps:", err)
            completion([], nil)
            return
        }
        // success
        guard let data = data else { return }
            
        do {
            let serviceResult = try JSONDecoder().decode(ServiceResult.self, from: data)
            print(" :::::::: G E T T I N G :::::::::::serviceResult.messages ", serviceResult.messages)
            completion(serviceResult.messages, nil)
        } catch let jsonErr {
            print("Failed to decode json:", jsonErr)
            completion([], jsonErr)
            }
        }.resume() // request triggered
    }
}
