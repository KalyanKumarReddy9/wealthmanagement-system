import os
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure the API key
genai.configure(api_key=os.getenv('GEMINI_API_KEY'))

def generate_ai_recommendations(user_data):
    """
    Generate AI-powered financial recommendations based on user data
    """
    try:
        # Create the generative model
        model = genai.GenerativeModel('gemini-pro')
        
        # Prepare the prompt with user data
        prompt = f"""
        As a personal financial advisor, analyze the following user financial data and provide personalized recommendations:

        User Profile:
        - Monthly Income: {user_data.get('monthly_income', 0)}
        - Monthly Expenses: {user_data.get('monthly_expenses', 0)}
        - Net Worth: {user_data.get('net_worth', 0)}
        - Total Assets: {user_data.get('total_assets', 0)}
        - Expense Categories: {user_data.get('category_expenses', [])}
        - Current Goals: {user_data.get('goals', [])}
        - Current Assets: {user_data.get('assets', [])}

        Please provide specific, actionable recommendations in the following format:
        1. Short-term savings recommendations (next 3-6 months)
        2. Medium-term investment suggestions (6 months - 2 years)
        3. Long-term wealth building strategies (2+ years)
        4. Specific expense reduction opportunities
        5. Personalized goal achievement plans

        Structure the response as a JSON object with the following keys:
        {{
          "short_term_suggestions": [...],
          "medium_term_suggestions": [...],
          "long_term_suggestions": [...],
          "expense_reduction_opportunities": [...],
          "personalized_goal_plans": [...],
          "overall_financial_health_score": number (1-100)
        }}

        Be specific, actionable, and realistic based on the user's financial situation.
        """

        # Generate content
        response = model.generate_content(prompt)
        
        # Parse the response (note: in production, you'd want more robust parsing)
        import json
        # Try to extract JSON from the response
        response_text = response.text
        
        # Look for JSON in the response
        import re
        json_match = re.search(r'\{.*\}', response_text, re.DOTALL)
        if json_match:
            json_str = json_match.group(0)
            recommendations = json.loads(json_str)
            return recommendations
        else:
            # If no JSON found, return a basic structure
            return {
                "short_term_suggestions": ["Consult with a financial advisor for personalized guidance"],
                "medium_term_suggestions": ["Consider diversifying your investment portfolio"],
                "long_term_suggestions": ["Plan for retirement by increasing contributions"],
                "expense_reduction_opportunities": ["Review subscription services for potential cuts"],
                "personalized_goal_plans": ["Set up automatic savings transfers"],
                "overall_financial_health_score": 50
            }
            
    except Exception as e:
        print(f"Error generating AI recommendations: {str(e)}")
        return {
            "short_term_suggestions": ["Consider reviewing your budget"],
            "medium_term_suggestions": ["Look into low-risk investment options"],
            "long_term_suggestions": ["Plan for retirement and emergency funds"],
            "expense_reduction_opportunities": ["Identify unnecessary subscriptions"],
            "personalized_goal_plans": ["Set specific, measurable financial goals"],
            "overall_financial_health_score": 50
        }


def generate_goal_based_plan(user_goals, user_income, user_expenses):
    """
    Generate a specific plan based on user goals
    """
    try:
        model = genai.GenerativeModel('gemini-pro')
        
        goals_description = ""
        for goal in user_goals:
            goals_description += f"- {goal['name']}: Target amount {goal['target_amount']}"
            if 'deadline' in goal and goal['deadline']:
                goals_description += f", Deadline: {goal['deadline']}"
            goals_description += "\n"
        
        prompt = f"""
        Based on the following user financial situation and goals, create a detailed financial plan:

        User Financial Situation:
        - Monthly Income: {user_income}
        - Monthly Expenses: {user_expenses}
        - Available Monthly Savings: {user_income - user_expenses if user_income > user_expenses else 0}

        User Goals:
        {goals_description}

        Create a prioritized financial plan with:
        1. Monthly savings allocation for each goal
        2. Timeline to achieve each goal
        3. Investment strategy for reaching goals
        4. Potential trade-offs between goals
        5. Recommendations for increasing income or reducing expenses to meet goals faster

        Return as JSON with this structure:
        {{
          "goal_allocation_plan": [
            {{
              "goal_name": "...",
              "monthly_contribution": number,
              "estimated_timeline_months": number,
              "investment_strategy": "..."
            }}
          ],
          "timeline_summary": "...",
          "investment_recommendations": [...],
          "trade_off_analysis": "...",
          "income_expense_optimization": [...]
        }}
        """
        
        response = model.generate_content(prompt)
        
        import json
        import re
        json_match = re.search(r'\{.*\}', response.text, re.DOTALL)
        if json_match:
            json_str = json_match.group(0)
            plan = json.loads(json_str)
            return plan
        else:
            return {
                "goal_allocation_plan": [],
                "timeline_summary": "Could not generate a detailed plan. Please consult a financial advisor.",
                "investment_recommendations": [],
                "trade_off_analysis": "",
                "income_expense_optimization": []
            }
            
    except Exception as e:
        print(f"Error generating goal-based plan: {str(e)}")
        return {
            "goal_allocation_plan": [],
            "timeline_summary": "Could not generate a detailed plan. Please consult a financial advisor.",
            "investment_recommendations": [],
            "trade_off_analysis": "",
            "income_expense_optimization": []
        }