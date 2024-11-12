using System.Text.Json;
using API.Data;
using API.DTOs;
using API.Interfaces;

public class ChatGptService : IChatGptService
{
    private readonly HttpClient _httpClient;
    private readonly DataContext _context;
    private readonly string _chatGptApiKey = "";

    public ChatGptService(HttpClient httpClient, DataContext context)
    {
        _httpClient = httpClient;
        _context = context;
    }

    public async Task<string> GetResponseFromChatGpt(UserPromptDto userPrompt)
    {
return @"
The error occurs because the Table component expects data, columns, rowsPerPageOptions, and optionally pageSize, but you are passing value instead of data. This mismatch is causing TypeScript to throw a type error.

Solution

Change the Prop Name: Instead of using value as a prop, use data to match the Props type.

Define the columns Prop: The columns prop is required by Props, so you should pass it along with data and rowsPerPageOptions.
";
        // // Determine if the user input is Arabic by checking some key fields
        // bool isArabic = IsArabic(userPrompt.Brief);

        // var authority = await _context.Authorities.FindAsync(userPrompt.AuthorityId);


        // // Build the content based on the detected language
        // var messageContent = isArabic
        //     ? $@"
        //     استخدم المعلومات التالية لإعداد رسالة موجهة إلى [اسم المستلم]:
        //     إليك التفاصيل:
        //     - ملخص: {userPrompt.Brief}
        //     - الاسم: {userPrompt.Name}
        //     - العنوان: {userPrompt.Address}
        //     - جهة خارجية أو اسم المستلم: {authority?.Name}
        //     - رقم الهوية الإماراتية: {userPrompt.EmiratesId}
        //     - البريد الإلكتروني: {userPrompt.Email}
        //     - الهاتف: {userPrompt.Phone}

        //     من فضلك اكتب الرسالة بطريقة مهنية وواضحة."
        //     : $@"
        //     Use the following information to prepare a message directed to [Recipient Name]:
        //     Here are the details:
        //     - Brief: {userPrompt.Brief}
        //     - Name: {userPrompt.Name}
        //     - Address: {userPrompt.Address}
        //     - External authority or party or Recipient Name: {authority?.Name}
        //     - Emirates ID: {userPrompt.EmiratesId}
        //     - Email: {userPrompt.Email}
        //     - Phone: {userPrompt.Phone}

        //     Please write the message in a professional and clear manner.";

        // // Prepare the request body
        // var requestBody = new
        // {
        //     model = "gpt-4-turbo",
        //     messages = new[] { new
        // {
        //     role = "user",
        //     content = messageContent
        // }},
        //     max_tokens = 1000
        // };

        // // Make the request to OpenAI API
        // using var request = new HttpRequestMessage(HttpMethod.Post, "https://api.openai.com/v1/chat/completions")
        // {
        //     Headers = { { "Authorization", $"Bearer {_chatGptApiKey}" } },
        //     Content = JsonContent.Create(requestBody)
        // };

        // var response = await _httpClient.SendAsync(request);
        // if (!response.IsSuccessStatusCode)
        // {
        //     throw new Exception("Failed to get a response from ChatGPT");
        // }

        // var jsonResponse = await response.Content.ReadAsStringAsync();
        // var result = JsonSerializer.Deserialize<ChatGptResponse>(jsonResponse, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

        // var content = result?.Choices?.FirstOrDefault()?.Message?.Content ?? string.Empty;

        // // If the original content was in Arabic, assume the response is in Arabic and format accordingly
        // return isArabic ? FormatTextForHtml(content) : FormatTextForHtml(content);
    }

    private static bool IsArabic(string text)
    {
        return !string.IsNullOrWhiteSpace(text) && System.Text.RegularExpressions.Regex.IsMatch(text, @"\p{IsArabic}");
    }

    private static string FormatTextForHtml(string text)
    {
        return $"<pre>{text.Replace("\n", "<br />").Replace("\r", "").Replace("\t", "&emsp;")}</pre>";
    }
}

public class ChatGptResponse
{
    public List<Choice>? Choices { get; set; }
}

public class Choice
{
    public Message? Message { get; set; }
}

public class Message
{
    public string? Content { get; set; }
}


/*

return @"<pre>
            Raed Alfarhan
        0523412595
        raf-se@hotmail.com

        [Date]

        [Company Name]
        [Hiring Manager's Name]
        [Company Address]
        [City, State, Zip]

        Dear [Hiring Manager's Name],

        I am writing to express my interest in the [Position Name] position at [Company Name]. With a strong background in [relevant field or industry], I am confident in my ability to contribute effectively to your team and help [Company Name] achieve its goals.

        I possess a [degree or certification] in [relevant field] and have [number] years of experience working in roles that have honed my skills in [specific areas]. I am particularly adept at [specific skills or abilities], which I believe would make me a valuable asset to your team.

        In addition to my technical skills, I am also known for my strong work ethic, attention to detail, and ability to work well both independently and as part of a team. I am always eager to learn and adapt to new challenges, and I am excited about the opportunity to bring my expertise to [Company Name].

        I would welcome the opportunity to further discuss how my background, skills, and enthusiasm for [Company Name]'s mission align with the requirements of the [Position Name] role. Thank you for considering my application. I look forward to the possibility of contributing to your team.

        Warm regards,

        Raed Alfarhan

        [Attachment: Resume]
            </pre>";
            */