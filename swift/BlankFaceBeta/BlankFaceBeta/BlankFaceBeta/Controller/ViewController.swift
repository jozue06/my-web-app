//
//  ViewController.swift
//  BlankFaceBeta
//
//  Created by Joshua McClung on 11/28/20.
//  Copyright © 2020 Joshua McClung. All rights reserved.
//

import Foundation
import UIKit
import SocketIO
import SwiftUI
import Combine

//class ViewController: UIViewController, UITableViewDelegate, UITableViewDataSource {
//
//    private var tableView: UITableView!
    private var itemsArray: [String]?
    private let serverURL = "http://localhost:3001/messages" // webservice URL with port

    fileprivate var manager: SocketManager?
    fileprivate var socket: SocketIOClient?
//
//    override func viewDidLoad() {
//        super.viewDidLoad()
//        setTable()      // set up table view with autoLayout and add to view
//        setSockets()    // enabled websocket event listeners
//        getMessages()  // make a manual first call to Message API
//    }
//
    private func getMessages() {
        itemsArray = []
        //  call to getMessages API that is parsed inside Service class
        Service.shared.getMessagesFromServer() { (res, err) in
               print("getting messages in VC two ", res)
            if err != nil {print(String(describing: err)); return} // an error is received print error to log and stop

            //iterate through results and append headline string to the itemsArray for the table datasource
            for item in res {
                print("getting messages in VC three ", item)
                self.itemsArray?.append(item.username + " " + item.message)
            }

            print("ATT THE END", self.itemsArray as Any)
//            DispatchQueue.main.async(execute: {self.tableView?.reloadData()}) // refresh tableview on main thread
        }
    }
//
//    // set the websocket manager. fileprivate to protect this call within this specific class file
//    fileprivate func setSockets() {
//        setSocketManager()
//        setSocketEvents()
//        socket?.connect()
//    }
//
//    fileprivate func setSocketManager() {
//
//        manager = SocketManager(socketURL: URL(string: serverURL)!, config: [.log(false)])
//        socket = manager?.defaultSocket
//    }
//
//    fileprivate func setSocketEvents() {
//
//        // socket event handlers
//        self.socket?.on(clientEvent: .connect) {_, _ in
//            print("socket connected")
//        }
//        self.socket?.on("new message") {_, _ in
//            self.getMessages()
//        }
//    }
//
//    override func didReceiveMemoryWarning() {
//        super.didReceiveMemoryWarning()
//    }
//}

//extension ViewController {
//
//    // table setup methods
//    private func setTable() {
//        tableView = UITableView(frame: CGRect.zero) // set to frame CGRect to zero since dimensions will be handled by autolayout
//        view.addSubview(self.tableView)
//
//        //set autolayout parameters
//        tableView.translatesAutoresizingMaskIntoConstraints = false
//        tableView.topAnchor.constraint(equalTo: self.view.topAnchor, constant: 0).isActive = true
//        tableView.bottomAnchor.constraint(equalTo: self.view.bottomAnchor, constant: 0).isActive = true
//        tableView.rightAnchor.constraint(equalTo: self.view.rightAnchor, constant: 0).isActive = true
//        tableView.leftAnchor.constraint(equalTo: self.view.leftAnchor, constant: 0).isActive = true
//
//        // add datasource and delegate
//        tableView.dataSource = self
//        tableView.delegate = self
//
//        // styling and registering custom cells
//        tableView.backgroundColor = .white
//        tableView.register(UITableViewCell.self, forCellReuseIdentifier: "cell")
//
//         view.addSubview(tableView)
//       }
//
//    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
//        // if itemsArray is not initialized make 0 count
//        return itemsArray?.count ?? 0
//    }
//
//    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
//        let cell = tableView.dequeueReusableCell(withIdentifier: "cell", for: indexPath)
//        cell.textLabel?.text = self.itemsArray![indexPath.row]
//        return cell
//    }
//}


struct ChatScreen: View {
//    @EnvironmentObject private var userInfo: UserInfo
        private var itemsArray: [String]?
        private let serverURL = "http://localhost:3001/messages" // webservice URL with port

        fileprivate var manager: SocketManager?
        fileprivate var socket: SocketIOClient?
    //
    //    override func viewDidLoad() {
    //        super.viewDidLoad()
    //        setTable()      // set up table view with autoLayout and add to view
    //        setSockets()    // enabled websocket event listeners
    //        getMessages()  // make a manual first call to Message API
    //    }
    //
    private mutating func getMessages() {
        itemsArray = []
        //  call to getMessages API that is parsed inside Service class
        Service.shared.getMessagesFromServer() { (res, err) in
               print("getting messages in VC two ", res)
            if err != nil {print(String(describing: err)); return} // an error is received print error to log and stop

            //iterate through results and append headline string to the itemsArray for the table datasource
            for item in res {
                print("getting messages in VC three ", item)
                self.itemsArray?.append(item.username + " " + item.message)
            }

            print("ATT THE END", self.itemsArray as Any)
//            DispatchQueue.main.async(execute: {self.tableView?.reloadData()}) // refresh tableview on main thread
        }
    }
    @StateObject private var model = ChatScreenModel()
    @State private var message = ""
    
    // MARK: - Events
//    private func onAppear() {
//        model.connect(username: userInfo.username, userID: userInfo.userID)
//    }
//
//    private func onDisappear() {
//        model.disconnect()
//    }
//
//    private func onCommit() {
//        if !message.isEmpty {
//            model.send(text: message)
//            message = ""
//        }
//    }
    
//    private func scrollToLastMessage(proxy: ScrollViewProxy) {
//        if let lastMessage = model.messages.last {
//            withAnimation(.easeOut(duration: 0.4)) {
//                proxy.scrollTo(lastMessage.id, anchor: .bottom)
//            }
//        }
//    }

    // MARK: -
    var body: some View {
        VStack {
            // Chat history.
            ScrollView {
                ScrollViewReader{ proxy in
                    LazyVStack(spacing: 8) {
                        ForEach(model.messages) { message in
                            ChatMessageRow(message: message, isUser: message.userID == userInfo.userID)
                                .id(message.id)
                        }
                    }
                    .padding(10)
                    .onChange(of: model.messages.count) { _ in
                        scrollToLastMessage(proxy: proxy)
                    }
                }
            }

            // Message field.
//            HStack {
//                TextField("Message", text: $message, onEditingChanged: { _ in }, onCommit: onCommit)
//                    .padding(10)
//                    .background(Color.secondary.opacity(0.2))
//                    .cornerRadius(5)
//
//                Button(action: onCommit) {
//                    Image(systemName: "arrowshape.turn.up.right")
//                        .font(.system(size: 20))
//                        .padding(6)
//                }
//                .cornerRadius(5)
//                .disabled(message.isEmpty)
//                .hoverEffect(.highlight)
//            }
//            .padding()
        }
//        .navigationTitle("Chat")
//        .onAppear(perform: onAppear)
//        .onDisappear(perform: onDisappear)
    }
}

// MARK: - Individual chat message balloon
private struct ChatMessageRow: View {
    static private let dateFormatter: DateFormatter = {
        let formatter = DateFormatter()
        formatter.dateStyle = .none
        formatter.timeStyle = .short
        return formatter
    }()
    
    let message: Message
    let isUser: Bool
    
    var body: some View {
        HStack {
            if isUser {
                Spacer()
            }
            
            VStack(alignment: .leading, spacing: 6) {
                HStack {
                    Text(message.username)
                        .fontWeight(.bold)
                        .font(.system(size: 12))
                    
                    Text(message.message)
                        .font(.system(size: 10))
                        .opacity(0.7)
                }
                
                Text(message.message)
            }
            .foregroundColor(isUser ? .white : .black)
            .padding(10)
            .background(isUser ? Color.blue : Color(white: 0.95))
            .cornerRadius(5)
            
            if !isUser {
                Spacer()
            }
        }
        .transition(.scale(scale: 0, anchor: isUser ? .topTrailing : .topLeading))
    }
}

// MARK: - Chat Screen model
/**
 * All business logic is performed in this Observable Object.
 */
private final class ChatScreenModel: ObservableObject {
    private var username: String?
    private var userID: UUID?
    
    private var webSocketTask: URLSessionWebSocketTask?
    
    @Published private(set) var messages: [Message] = []

    // MARK: - Connection
    func connect(username: String, userID: UUID) {
        guard webSocketTask == nil else {
            return
        }

        self.username = username
        self.userID = userID

        let url = URL(string: "ws://127.0.0.1:8080/chat")!
        webSocketTask = URLSession.shared.webSocketTask(with: url)
        webSocketTask?.receive(completionHandler: onReceive)
        webSocketTask?.resume()
    }
    
    func disconnect() {
        webSocketTask?.cancel(with: .normalClosure, reason: nil)
    }
    
    // MARK: - Sending / recieving
    private func onReceive(incoming: Result<URLSessionWebSocketTask.Message, Error>) {
        webSocketTask?.receive(completionHandler: onReceive)

        if case .success(let message) = incoming {
            onMessage(message: message)
        }
        else if case .failure(let error) = incoming {
            print("Error", error)
        }
    }
    
    private func onMessage(message: URLSessionWebSocketTask.Message) {
        if case .string(let text) = message {
            guard let data = text.data(using: .utf8),
                  let chatMessage = try? JSONDecoder().decode(ReceivingChatMessage.self, from: data)
            else {
                return
            }

            DispatchQueue.main.async {
                withAnimation(.spring()) {
                    self.messages.append(chatMessage)
                }
            }
        }
    }
//
//    func send(text: String) {
//        guard let username = username,
//              let userID = userID
//        else {
//            return
//        }
//
//        let message = SubmittedChatMessage(message: text, user: username, userID: userID)
//        guard let json = try? JSONEncoder().encode(message),
//              let jsonString = String(data: json, encoding: .utf8)
//        else {
//            return
//        }
//
//        webSocketTask?.send(.string(jsonString)) { error in
//            if let error = error {
//                print("Error sending message", error)
//            }
//        }
//    }
    
    deinit {
        disconnect()
    }
}
