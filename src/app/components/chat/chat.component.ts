import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { ChatConversation, ChatMessage } from '../../models/user.model';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit {
  @Input() customerId!: string;
  @Input() vendorId!: string;
  @Input() userType!: 'customer' | 'vendor';
  
  conversation!: ChatConversation;
  newMessage = '';
  currentUser: any;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.currentUser = this.dataService.getCurrentUser();
    this.conversation = this.dataService.getOrCreateConversation(this.customerId, this.vendorId);
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      this.dataService.sendMessage(
        this.conversation.id,
        this.currentUser.id,
        this.newMessage,
        this.userType
      );
      this.newMessage = '';
    }
  }

  isMyMessage(message: ChatMessage): boolean {
    return message.senderId === this.currentUser.id;
  }
}