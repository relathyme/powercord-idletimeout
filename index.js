const { Plugin } = require("powercord/entities")

module.exports = class IdleTimeout extends Plugin {
    startPlugin(){
        const defaulttm = require('powercord/webpack').constants.IDLE_DURATION
        powercord.api.commands.registerCommand({
            command: "idletimeout",
            description: 'Edits idle timeout.',
            usage: '<time in minutes> | disable | default',
            executor(args){
                if(args[0] == "disable"){
                    require('powercord/webpack').constants.IDLE_DURATION = Infinity
                    return {
                        send: false,
                        result: "> ✅ Disabled idle timeout"
                    }
                }else if(args[0] == "default"){
                    require('powercord/webpack').constants.IDLE_DURATION = defaulttm
                    return {
                        send: false,
                        result: "> ✅ Timeout set to default"
                    }
                }else{
                    const num = parseInt(args[0], 10)
                    if(Number.isSafeInteger(num) || !Number.isNaN(num)){
                        const newtm = num*60000
                        require('powercord/webpack').constants.IDLE_DURATION = newtm
                        return {
                            send: false,
                            result: `> ✅ Timeout set to ${num} min`
                        }
                    }else{
                        return {
                            send: false,
                            result: "> ❌ Time is not a number"
                        }
                    }
                }
            }
        })
    }
}