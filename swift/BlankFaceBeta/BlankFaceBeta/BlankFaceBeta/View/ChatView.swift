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
        NavigationView {
            VStack {
                List {
                    ForEach(chatHelper.realTimeMessages, id: \.self) { msg in
                        MessageView(currentMessage: msg)
                    }
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
                }.frame(minHeight: CGFloat(50)).padding()
            }.navigationBarTitle(Text("Chat"), displayMode: .inline)
            .padding(.bottom, keyboard.currentHeight)
            .edgesIgnoringSafeArea(keyboard.currentHeight == 0.0 ? .leading: .bottom)
        }.onTapGesture {
            self.endEditing(true)
        }
    }
    
    func sendMessage() {
        chatHelper.addMessage(chatMessage: Message(username: username, message: typingMessage))
        typingMessage = ""
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ChatView()
    }
}
