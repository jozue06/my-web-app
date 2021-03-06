//
//  ContentMessageView.swift
//

import SwiftUI

struct ContentMessageView: View {
    var username: String
    var contentMessage: String
    
    var body: some View {
        VStack(alignment: .leading, spacing: 6) {
            HStack {
                Text(username)
                    .fontWeight(.bold)
                    .font(.system(size: 12))
            }

            Text(contentMessage)
        }
        .padding(10)
        .foregroundColor(Color.black)
        .background(Color.blue)
        .cornerRadius(10)

    }
}

struct ContentMessageView_Previews: PreviewProvider {
    static var previews: some View {
        ContentMessageView(username: "test", contentMessage: "Hi, I am your friend")
    }
}
