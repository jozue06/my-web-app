//
//  ContentMessageView.swift
//  ChatViewTutorial
//
//  Created by Duy Bui on 2/2/20.
//  Copyright © 2020 Duy Bui. All rights reserved.
//

import SwiftUI

struct ContentMessageView: View {
    var username: String
    var contentMessage: String
//    var isCurrentUser: Bool
    
    var body: some View {
        HStack {
            VStack(alignment: .leading, spacing: 6) {
                HStack {
                    Text(username)
                        .fontWeight(.bold)
                        .font(.system(size: 12))

                    Text(contentMessage)
                        .font(.system(size: 10))
                        .opacity(0.7)
                }

                Text(contentMessage)
            }
            .padding(10)
            .foregroundColor(Color.black)
            .background(Color.blue)
            .cornerRadius(10)

//                    if !isUser {
//                        Spacer()
//                    }
        }
        .transition(.scale(scale: 0, anchor: .topLeading))
    }
    

}

struct ContentMessageView_Previews: PreviewProvider {
    static var previews: some View {
        ContentMessageView(username: "test", contentMessage: "Hi, I am your friend")
    }
}
