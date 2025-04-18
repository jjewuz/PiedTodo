using Telegram.Bot;
using Quartz;
using Quartz.Impl;
using Telegram.Bot.Types;

namespace TaskHabitApi.Controllers;

public class BotContoller
{
    public static TelegramBotClient bot;

    IScheduler scheduler;
    public BotContoller() 
    {
        bot = new TelegramBotClient(Environment.GetEnvironmentVariable("REACT_APP_BOT_TOKEN"));
        var me = bot.GetMe().Result;
        Console.WriteLine($"Hello, World! I am user {me.Id} and my name is {me.FirstName}.");
        scheduler = StdSchedulerFactory.GetDefaultScheduler().Result;
        scheduler.Start();
    }

    public void LoadDataFromDB()
    {
        //TODO: Implement with db
    }

    public void ScheduleTask(long userId, long taskId, DateTime taskDate)
    {
        
    }
}
