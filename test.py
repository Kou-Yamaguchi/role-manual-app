from openai import OpenAI
client = OpenAI()

completion = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {
            "role": "user",
            "content": "クロロルシルフルとは？"
        }
    ]
)

# メッセージ全体を表示
print(completion.choices[0].message)

# メッセージの内容 (content) だけを表示
print(completion.choices[0].message.content)
