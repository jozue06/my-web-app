import SwiftUI

struct MessageView : View {
    var currentMessage: Message
    var body: some View {
        HStack(alignment: .bottom, spacing: 15) {
//            if !currentMessage.user.isCurrentUser {
//                Image(currentMessage.user.avatar)
//                .resizable()
//                .frame(width: 40, height: 40, alignment: .center)
//                .cornerRadius(20)
//            } else {
//                Spacer()
//            }
            ContentMessageView(username: currentMessage.username, contentMessage: currentMessage.message)
        }.padding()
    }
}

struct MessageView_Previews: PreviewProvider {
    static var previews: some View {
        MessageView(currentMessage: Message(username: "test", message: "There are a lot of premium iOS templates on iosapptemplates.com"))
    }
}
