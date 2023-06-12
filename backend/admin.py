from flask_admin.contrib.sqla import ModelView
from flask_login import current_user


class AdminView(ModelView):
    def is_accessible(self):
        # logic to check if user is admin
        return current_user.is_admin


class TopicView(ModelView):
    def is_accessible(self):
        # logic to check if user is admin
        return current_user.is_admin

    # customize view
    column_list = ('title', 'status', 'total_vote_count')
    column_searchable_list = ('title',)
    column_filters = ('status',)
