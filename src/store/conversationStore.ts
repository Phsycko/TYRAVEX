import { defineStore } from 'pinia'
import type { Message, QuickCommand, ConversationContext } from '@/types/types'
import { initialMessages, initialQuickCommands, systemResponses } from '@/data/mockData'

export const useConversationStore = defineStore('conversation', {
    state: () => ({
        messages: [] as Message[],
        quickCommands: initialQuickCommands as QuickCommand[],
        context: {
            currentTopic: 'latency_issue',
            relevantMetrics: ['m2', 'm4'],
            relevantEvents: ['e1'],
            showIntelPanel: true
        } as ConversationContext,
        isTyping: false,
        userInput: ''
    }),

    getters: {
        allMessages: (state) => state.messages,
        availableCommands: (state) => state.quickCommands,
        currentContext: (state) => state.context
    },

    actions: {
        initializeConversation() {
            // Add initial system messages with delay
            initialMessages.forEach((msg, index) => {
                setTimeout(() => {
                    this.addSystemMessage(msg.content)
                }, index * 2000)
            })
        },

        addSystemMessage(content: string) {
            const message: Message = {
                id: `msg-${Date.now()}-${Math.random()}`,
                type: 'system',
                sender: 'TYRAVEX',
                content,
                timestamp: new Date()
            }
            this.messages.push(message)
        },

        addUserMessage(content: string) {
            const message: Message = {
                id: `msg-${Date.now()}-${Math.random()}`,
                type: 'user',
                sender: 'USER',
                content,
                timestamp: new Date()
            }
            this.messages.push(message)
            this.userInput = ''
        },

        executeCommand(commandAction: string) {
            // Add user message for the command
            const command = this.quickCommands.find(cmd => cmd.action === commandAction)
            if (command) {
                this.addUserMessage(command.label)
            }

            // Simulate system thinking
            this.isTyping = true

            // Add system response after delay
            setTimeout(() => {
                const response = systemResponses[commandAction] || systemResponses.default || 'Comando procesado.'
                this.addSystemMessage(response)
                this.isTyping = false

                // Update context based on action
                this.updateContextAfterCommand(commandAction)
            }, 1500)
        },

        updateContextAfterCommand(action: string) {
            switch (action) {
                case 'analyze_latency':
                    this.context.showIntelPanel = true
                    this.context.relevantMetrics = ['m2', 'm4']
                    this.context.relevantEvents = ['e1']
                    break
                case 'show_impact':
                    this.context.showIntelPanel = true
                    this.context.relevantMetrics = ['m1', 'm3']
                    break
                case 'dismiss':
                    this.context.showIntelPanel = false
                    this.updateQuickCommands([
                        {
                            id: 'qc5',
                            label: 'Ver estado general',
                            action: 'general_status',
                            context: 'general'
                        },
                        {
                            id: 'qc6',
                            label: 'Revisar operaciones',
                            action: 'check_operations',
                            context: 'general'
                        }
                    ])
                    break
                case 'full_diagnostic':
                    this.context.showIntelPanel = true
                    this.context.relevantMetrics = ['m1', 'm2', 'm3', 'm4']
                    this.context.relevantEvents = ['e1', 'e2', 'e3']
                    break
            }
        },

        updateQuickCommands(commands: QuickCommand[]) {
            this.quickCommands = commands
        },

        sendUserInput() {
            if (this.userInput.trim()) {
                this.addUserMessage(this.userInput)

                // Simulate system response
                this.isTyping = true
                setTimeout(() => {
                    this.addSystemMessage('Entendido. Procesando tu solicitud...')
                    this.isTyping = false
                }, 1000)
            }
        }
    }
})
