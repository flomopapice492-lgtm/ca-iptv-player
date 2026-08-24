# Contributing to CA IPTV Player

Thank you for your interest in contributing! This document provides guidelines and instructions.

## Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help others learn and grow
- Report issues responsibly

## How to Contribute

### Reporting Bugs

1. **Check existing issues** - Avoid duplicates
2. **Provide details**:
   - Browser/OS version
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
3. **Use issue template** - Follow the provided format

### Suggesting Features

1. **Check existing discussions**
2. **Describe the feature**:
   - What problem does it solve?
   - Use cases
   - Potential implementation
3. **Consider the scope** - Align with project goals

### Submitting Code

#### Setup

```bash
# Fork the repository
# Clone your fork
git clone https://github.com/YOUR_USERNAME/ca-iptv-player.git
cd ca-iptv-player

# Add upstream
git remote add upstream https://github.com/flomopapice492-lgtm/ca-iptv-player.git

# Install dependencies
npm install
cd frontend && npm install
cd ../backend && npm install
cd ..
```

#### Development

```bash
# Start development server
npm run dev

# Run linting
npm run lint

# Run tests
npm test
```

#### Branches

- **main**: Production-ready code
- **develop**: Development branch
- **feature/***: New features
- **fix/***: Bug fixes
- **docs/***: Documentation

#### Commit Messages

```
<type>: <subject>

<body>

<footer>
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style
- `refactor`: Code refactoring
- `perf`: Performance improvement
- `test`: Tests
- `chore`: Build/dependency

Example:
```
feat: add channel favorites

Implement ability to save favorite channels to local storage.
Channels persist across sessions.

Closes #123
```

#### Pull Requests

1. **Create feature branch** from `develop`:
   ```bash
   git checkout -b feature/my-feature
   ```

2. **Make changes** with meaningful commits

3. **Update documentation** if needed

4. **Test thoroughly**:
   ```bash
   npm run build
   npm test
   ```

5. **Push to your fork**:
   ```bash
   git push origin feature/my-feature
   ```

6. **Open PR**:
   - Title: Clear, concise description
   - Description: Why, what, how
   - Reference issues: "Closes #123"
   - Screenshot/demo if UI changes

### Legal Compliance

For channel or EPG source additions:

1. **Verify licensing** - Confirm source is legal
2. **Check CRTC status** - For Canadian broadcasters
3. **Document source** - Include attribution
4. **No pirated content** - Absolutely no unauthorized streams
5. **Update LEGAL.md** - Reference compliance

## Development Guidelines

### Frontend (React/TypeScript)

- Follow TypeScript strict mode
- Use functional components with hooks
- Props: Define interfaces for all props
- CSS: Use Tailwind utilities
- Components: Export as default, place in `components/`
- Hooks: Custom hooks in `hooks/`, prefixed with `use`

### Backend (Node.js)

- Use async/await (no callbacks)
- Error handling with try/catch
- Routes: RESTful principles
- Services: Business logic separation
- No hardcoded credentials
- Logging: Use console (piped to logs)

### Testing

- Write tests for new features
- Maintain 80%+ coverage
- Test both happy and error paths
- Name: `filename.test.ts`
- Framework: Jest

### Documentation

- Update README.md for user-facing changes
- Add JSDoc comments for public functions
- Include examples for complex features
- Keep LEGAL.md current

## Project Structure

```
ca-iptv-player/
├── backend/              # Express API
├── frontend/             # React app
├── public-channels/      # M3U playlists
├── epg-data/             # EPG utilities
├── docs/                 # Documentation
├── README.md
├── LEGAL.md
├── CONTRIBUTING.md
└── docker-compose.yml
```

## Review Process

1. **Automated checks**: CI/CD pipeline
2. **Code review**: Maintainers review
3. **Legal check**: For content additions
4. **Merge**: Approved PRs merged by maintainers

## Recognition

Contributors are recognized in:
- CONTRIBUTORS.md file
- GitHub contributors page
- Release notes

## Questions?

- **Issues**: GitHub Issues
- **Discussions**: GitHub Discussions
- **Security**: security@ca-iptv-player.dev

## License

By contributing, you agree your code will be under MIT License.

---

Thank you for making CA IPTV Player better! 🙏
