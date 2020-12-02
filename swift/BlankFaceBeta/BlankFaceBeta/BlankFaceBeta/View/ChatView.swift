//
//  ContentView.swift

import SwiftUI

struct ChatView: View {
    @State var typingMessage: String = ""
    @State var username: String = ""
    @EnvironmentObject var chatHelper: ChatHelper
    @ObservedObject private var keyboard = KeyboardResponder()

    init() {
        UITableView.appearance().separatorStyle = .none
        UITableView.appearance().tableFooterView = UIView()
    }
    
    var body: some View {
        GeometryReader { reader in
            VStack {
                ScrollView {
                    VStack {
                        ForEach(self.chatHelper.realTimeMessages, id: \.self) { msg in
                            ContentMessageView(username: msg.username, contentMessage: msg.message)
                                .frame(width: reader.size.width)
                                .rotationEffect(.radians(.pi))
                                .scaleEffect(x: -1, y: 1, anchor: .center)
                        }
                    }
                }
            }.rotationEffect(.radians(.pi))
            .scaleEffect(x: -1, y: 1, anchor: .center)
        }.onTapGesture {
            self.endEditing(true)
        }
        HStack {
            TextField("Username...", text: $username)
            .textFieldStyle(RoundedBorderTextFieldStyle())
            .frame(minHeight: CGFloat(30))
            TextField("Message...", text: $typingMessage)
                .textFieldStyle(RoundedBorderTextFieldStyle())
                .frame(minHeight: CGFloat(30))
            Button(action: sendMessage) {
                Text("Send")
            }
        }
    }
    
    func sendMessage() {
        chatHelper.addMessage(chatMessage: Message(username: username, message: typingMessage))
        typingMessage = ""
    }
}
